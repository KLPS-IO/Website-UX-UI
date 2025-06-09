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

/* /survey/questions/answer/longfreetext/answer.twig */
class __TwigTemplate_d5a72521c78eac5e54c678243814ebdf extends Template
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
        // line 15
        yield "<!-- Long free text -->

<!-- answer -->
";
        // line 18
        if (($context["withColumn"] ?? null)) {
            // line 19
            yield "<div class='";
            yield $this->sandbox->ensureToStringAllowed(($context["coreClass"] ?? null), 19, $this->source);
            yield " row'>
    <div class=\"";
            // line 20
            yield $this->sandbox->ensureToStringAllowed(($context["extraclass"] ?? null), 20, $this->source);
            yield "\">
";
        } else {
            // line 22
            yield "<div class='";
            yield $this->sandbox->ensureToStringAllowed(($context["coreClass"] ?? null), 22, $this->source);
            yield " ";
            yield $this->sandbox->ensureToStringAllowed(($context["extraclass"] ?? null), 22, $this->source);
            yield "'>
";
        }
        // line 24
        yield "    <textarea
        class=\"form-control ";
        // line 25
        yield $this->sandbox->ensureToStringAllowed(($context["kpclass"] ?? null), 25, $this->source);
        yield "\"
        name=\"";
        // line 26
        yield $this->sandbox->ensureToStringAllowed(($context["name"] ?? null), 26, $this->source);
        yield "\"
        id=\"answer";
        // line 27
        yield $this->sandbox->ensureToStringAllowed(($context["name"] ?? null), 27, $this->source);
        yield "\"
        placeholder=\"";
        // line 28
        yield LS_Twig_Extension::flatString(LS_Twig_Extension::processString($this->sandbox->ensureToStringAllowed(($context["placeholder"] ?? null), 28, $this->source), 1), 1);
        yield "\"
        rows=\"";
        // line 29
        yield $this->sandbox->ensureToStringAllowed(($context["drows"] ?? null), 29, $this->source);
        yield "\"
        ";
        // line 30
        if (($context["inputsize"] ?? null)) {
            yield " cols=\"";
            yield $this->sandbox->ensureToStringAllowed(($context["inputsize"] ?? null), 30, $this->source);
            yield "\" ";
        }
        // line 31
        yield "        ";
        if (($context["maxlength"] ?? null)) {
            yield " maxlength=\"";
            yield $this->sandbox->ensureToStringAllowed(($context["maxlength"] ?? null), 31, $this->source);
            yield "\" ";
        }
        // line 32
        yield "        aria-labelledby=\"ls-question-text-";
        yield $this->sandbox->ensureToStringAllowed(($context["basename"] ?? null), 32, $this->source);
        yield "\"
    >";
        // line 33
        yield $this->sandbox->ensureToStringAllowed(($context["dispVal"] ?? null), 33, $this->source);
        yield "</textarea>
";
        // line 34
        if (($context["withColumn"] ?? null)) {
            // line 35
            yield "    </div>
</div>
";
        } else {
            // line 38
            yield "</div>
";
        }
        // line 40
        yield "
<!-- end of answer -->
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "/survey/questions/answer/longfreetext/answer.twig";
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
        return array (  121 => 40,  117 => 38,  112 => 35,  110 => 34,  106 => 33,  101 => 32,  94 => 31,  88 => 30,  84 => 29,  80 => 28,  76 => 27,  72 => 26,  68 => 25,  65 => 24,  57 => 22,  52 => 20,  47 => 19,  45 => 18,  40 => 15,);
    }

    public function getSourceContext()
    {
        return new Source("", "/survey/questions/answer/longfreetext/answer.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/application/views/survey/questions/answer/longfreetext/answer.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 18);
        static $filters = array();
        static $functions = array("flatString" => 28, "processString" => 28);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['flatString', 'processString'],
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
