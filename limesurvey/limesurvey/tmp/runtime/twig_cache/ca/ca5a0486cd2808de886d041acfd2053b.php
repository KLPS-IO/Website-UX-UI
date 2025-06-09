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

/* ./subviews/registration/register_message.twig */
class __TwigTemplate_90bf0cfd00e027199390404b34db7e9f extends Template
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
        // line 17
        yield "
";
        // line 18
        if (($context["registerSuccess"] ?? null)) {
            // line 19
            yield "    <div ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 19), "registermessagea", [], "any", false, false, true, 19), 19, $this->source);
            yield " class=\"large-heading\">
        ";
            // line 20
            yield gT("Thank you for registering.");
            yield "
        <div class=\"form-heading mt-3\">
            ";
            // line 22
            yield gT("You will receive an email shortly.");
            yield "
        </div>
    </div>
";
        } else {
            // line 26
            yield "    <div ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 26), "registermessageb", [], "any", false, false, true, 26), 26, $this->source);
            yield " class=\"form-heading\">
    ";
            // line 27
            if (($context["sStartDate"] ?? null)) {
                // line 28
                yield "        ";
                yield gT("You may register for this survey but you have to wait for the {{sStartDate}} before starting the survey.");
                yield "
    ";
            } else {
                // line 30
                yield "        ";
                yield gT("You may have to register to take part in this survey.");
                yield "
    ";
            }
            // line 32
            yield "    ";
            yield gT("Please fill in the information and we’ll send you a link immediately.");
            yield "
    </div>
";
        }
        // line 35
        yield "
";
        // line 36
        if ( !empty(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aErrors", [], "any", false, false, true, 36))) {
            // line 37
            yield "    <ul class='";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 37), "maincoldivdivbul", [], "any", false, false, true, 37), 37, $this->source);
            yield " alert alert-danger list-unstyled mt-3' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 37), "maincoldivdivbul", [], "any", false, false, true, 37), 37, $this->source);
            yield ">
        ";
            // line 38
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aErrors", [], "any", false, false, true, 38));
            foreach ($context['_seq'] as $context["key"] => $context["error"]) {
                // line 39
                yield "            <li>";
                yield $this->sandbox->ensureToStringAllowed($context["error"], 39, $this->source);
                yield "</li>
        ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['error'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 41
            yield "    </ul>
";
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/registration/register_message.twig";
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
        return array (  113 => 41,  104 => 39,  100 => 38,  93 => 37,  91 => 36,  88 => 35,  81 => 32,  75 => 30,  69 => 28,  67 => 27,  62 => 26,  55 => 22,  50 => 20,  45 => 19,  43 => 18,  40 => 17,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/registration/register_message.twig", "/Users/emmamendez/Source/KLPS/Website-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/registration/register_message.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 18, "for" => 38);
        static $filters = array();
        static $functions = array("gT" => 20, "empty" => 36);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'for'],
                [],
                ['gT', 'empty'],
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
