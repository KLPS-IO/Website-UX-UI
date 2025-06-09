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

/* __string_template__c47ff0742d39344df1b436fcaf80c12d */
class __TwigTemplate_c24345a9923d752a636e89ae15fe413d extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'footer' => [$this, 'block_footer'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 25
        yield "
";
        // line 27
        $context["aError"] = CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aError", [], "any", false, false, true, 27);
        // line 28
        yield "
<!DOCTYPE html>
<html lang=\"";
        // line 30
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "languagecode", [], "any", false, false, true, 30), 30, $this->source);
        yield "\" dir=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "dir", [], "any", false, false, true, 30), 30, $this->source);
        yield "\"
      class=\"";
        // line 31
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "languagecode", [], "any", false, false, true, 31), 31, $this->source);
        yield " dir-";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "dir", [], "any", false, false, true, 31), 31, $this->source);
        yield " ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 31), "html", [], "any", false, false, true, 31), 31, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 31), "html", [], "any", false, false, true, 31), 31, $this->source);
        yield "
      xmlns=\"http://www.w3.org/1999/html\">

<head>
    <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>
    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"/>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>

    <title>
        ";
        // line 40
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "error", [], "any", false, false, true, 40)) {
            // line 41
            yield "            ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "error", [], "any", false, false, true, 41), 41, $this->source);
            yield "
        ";
        } else {
            // line 43
            yield "            Error ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "surveyls_title", [], "any", false, false, true, 43), 43, $this->source);
            yield "
        ";
        }
        // line 45
        yield "    </title>

    <meta name=\"generator\" content=\"LimeSurvey http://www.limesurvey.org\"/>
    ";
        // line 48
        if (LS_Twig_Extension::imageSrc("./files/favicon.ico")) {
            // line 49
            yield "        <link rel=\"shortcut icon\" href=\"";
            yield LS_Twig_Extension::imageSrc("./files/favicon.ico");
            yield "\"/>
    ";
        }
        // line 51
        yield "</head>

<body class=\"error-page ";
        // line 53
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 53), "body", [], "any", false, false, true, 53), 53, $this->source);
        yield " lang-";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "languagecode", [], "any", false, false, true, 53), 53, $this->source);
        yield " ";
        yield $this->sandbox->ensureToStringAllowed(($context["surveyformat"] ?? null), 53, $this->source);
        yield "\" marginwidth=\"0\"
      marginheight=\"0\" ";
        // line 54
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 54), "body", [], "any", false, false, true, 54), 54, $this->source);
        yield ">
    <div class=\"container m-auto \">
        <div class=\"row align-items-center\">
            <div class=\"col\">
                <h2 class=\"error-title\">
                    ";
        // line 59
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "error", [], "any", false, false, true, 59)) {
            // line 60
            yield "                        ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "error", [], "any", false, false, true, 60), 60, $this->source);
            yield "
                    ";
        }
        // line 62
        yield "                    ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "title", [], "any", false, false, true, 62), 62, $this->source);
        yield "
                </h2>
                <div class=\"error-content\">";
        // line 64
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "message", [], "any", false, false, true, 64), 64, $this->source);
        yield "</div>
                ";
        // line 65
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "contact", [], "any", false, false, true, 65)) {
            // line 66
            yield "                    ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "contact", [], "any", false, false, true, 66), 66, $this->source);
            yield "
                ";
        } else {
            // line 68
            yield "                    ";
            yield Twig\Extension\CoreExtension::sprintf(gT("For further information please contact %s:"), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "admin", [], "any", false, false, true, 68), 68, $this->source));
            yield "
                    ";
            // line 69
            if (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "adminemail", [], "any", false, false, true, 69)) {
                // line 70
                yield "                        <br>
                        <a class=\"error-link\" href='mailto:";
                // line 71
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "adminemail", [], "any", false, false, true, 71), 71, $this->source);
                yield "'>";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "adminemail", [], "any", false, false, true, 71), 71, $this->source);
                yield "</a>
                    ";
            }
            // line 73
            yield "                ";
        }
        // line 74
        yield "                ";
        if ( !Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "trace", [], "any", false, false, true, 74))) {
            // line 75
            yield "                    <pre>
                            ";
            // line 76
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aError"] ?? null), "trace", [], "any", false, false, true, 76), 76, $this->source);
            yield "
                    </pre>
                ";
        }
        // line 79
        yield "            </div>
            <div class=\"col d-flex\">
              ";
        // line 81
        if (LS_Twig_Extension::imageSrc("./files/error.png")) {
            // line 82
            yield "                ";
            yield LS_Twig_Extension::image("./files/error.png", "Survey Error", ["class" => "m-auto"]);
            yield "
              ";
        }
        // line 84
        yield "            </div>      
        </div>
    </div>
";
        // line 87
        yield from $this->unwrap()->yieldBlock('footer', $context, $blocks);
        // line 90
        yield "</body>
</html>
";
        return; yield '';
    }

    // line 87
    public function block_footer($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 88
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/footer/footer.twig");
        yield "
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "__string_template__c47ff0742d39344df1b436fcaf80c12d";
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
        return array (  209 => 88,  205 => 87,  198 => 90,  196 => 87,  191 => 84,  185 => 82,  183 => 81,  179 => 79,  173 => 76,  170 => 75,  167 => 74,  164 => 73,  157 => 71,  154 => 70,  152 => 69,  147 => 68,  141 => 66,  139 => 65,  135 => 64,  129 => 62,  123 => 60,  121 => 59,  113 => 54,  105 => 53,  101 => 51,  95 => 49,  93 => 48,  88 => 45,  82 => 43,  76 => 41,  74 => 40,  56 => 31,  50 => 30,  46 => 28,  44 => 27,  41 => 25,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__c47ff0742d39344df1b436fcaf80c12d", "");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 27, "if" => 40, "block" => 87);
        static $filters = array("format" => 68);
        static $functions = array("imageSrc" => 48, "gT" => 68, "image" => 82, "include" => 88);

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'block'],
                ['format'],
                ['imageSrc', 'gT', 'image', 'include'],
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
