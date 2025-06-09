<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* __string_template__144906279457b022001c3f6bde39a76f */
class __TwigTemplate_d75beb904caaed0268bc1a7af40a87c5 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        yield "<!-- Hints  -->
<div class=\"card card-primary border-left-danger h-100\">
    <div class=\"card-header\">
        <h5 class=\"card-title\">";
        // line 4
        yield gT("Hints and warnings");
        yield "</h5>
    </div>
    <ul class=\"list-group list-group-flush\">
        ";
        // line 7
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["warnings"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["warning"]) {
            // line 8
            yield "        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12 text-warning\">
                ";
            // line 10
            yield $this->sandbox->ensureToStringAllowed($context["warning"], 10, $this->source);
            yield "
            </div>
        </li>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['warning'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 14
        yield "        ";
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["hints"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["hint"]) {
            // line 15
            yield "        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
                ";
            // line 17
            yield $this->sandbox->ensureToStringAllowed($context["hint"], 17, $this->source);
            yield "
            </div>
        </li>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['hint'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 21
        yield "    </ul>
</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "__string_template__144906279457b022001c3f6bde39a76f";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  88 => 21,  78 => 17,  74 => 15,  69 => 14,  59 => 10,  55 => 8,  51 => 7,  45 => 4,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__144906279457b022001c3f6bde39a76f", "");
    }
    
    public function checkSecurity()
    {
        static $tags = array("for" => 7);
        static $filters = array();
        static $functions = array("gT" => 4);

        try {
            $this->sandbox->checkSecurity(
                ['for'],
                [],
                ['gT'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
